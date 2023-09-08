import { IconButton, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <>
            <Paper 
                component="form" 
                onSubmit={() => {}}
                sx={{
                    borderRadius: 20,
                    border: '1px solid #E3E3E3',
                    pl: 2,
                    boxShadow: 'none',
                    mr: {sm: 5}
                }}
            >
                <input 
                    className="search-bar" 
                    placeholder="Search..." 
                    value="" 
                    onChange={() => {}} 
                />
                <IconButton type="submit" sx={{p: '10px', color: 'red'}}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </>
    );
}

export default SearchBar