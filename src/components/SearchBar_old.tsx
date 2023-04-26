import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { BlockData } from './Blocks';
import { LOCAL_IP_ADDRESS } from '../App';


export interface ISearchBar {
    onSearch: (searchedBlocks: BlockData[], searchActive?: boolean) => void;
    onClearSearch: () => void;
}

export async function searchBlocks(searchBlock: string): Promise<BlockData[]> {
    try {
        const query = `searchBlock=${searchBlock}&regex=true`
        const response = await fetch(`http://${LOCAL_IP_ADDRESS}:3001/api/search?${query}`);
        const data: BlockData[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blocks history:', error);
        return [];
    }
}

const SearchBar: React.FC<ISearchBar> = ({ onSearch, onClearSearch }) => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    
        // Clear search when input is empty
        if (event.target.value === '') {
          onClearSearch();
          onSearch([], false);
        }
      };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        // Return early if the search input is empty
        if (searchInput.trim() === '') {
            return;
        }
        
        setLoading(true);
        const results = await searchBlocks(searchInput);
        onSearch(results); // Call the onSearch prop with the search results
        setLoading(false);
      };

    return (
        <TextField
            id="search-input"
            label="Search for blocks"
            variant="outlined"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;
