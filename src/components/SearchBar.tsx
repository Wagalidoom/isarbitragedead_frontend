import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { BlockData } from './Blocks';


export interface ISearchBar {
    onSearch: (searchedBlocks: BlockData[]) => void;
}

export async function searchBlocks(searchBlock: string): Promise<BlockData[]> {
    try {
        const query = `searchBlock=${searchBlock}&regex=true`
        const response = await fetch(`http://192.168.1.90:3001/api/searchy?${query}`);
        const data: BlockData[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blocks history:', error);
        return [];
    }
}

const SearchBar: React.FC<ISearchBar> = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = async () => {
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
