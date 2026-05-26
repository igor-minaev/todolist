import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {containerSx} from "@/Todolist.style";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Switch} from "@mui/material";
import {NavButton} from "@/NavButton";
import AppBar from "@mui/material/AppBar";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectThemeMode} from "@/app/app-selectors";
import {changeThemeModeAC} from "@/app/app-reducer";

export const Header = () => {

    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Container sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <Switch onChange={changeMode}/>
                        <NavButton>Sign in</NavButton>
                        <NavButton>FAQ</NavButton>
                        <NavButton>Login</NavButton>
                        <NavButton background={'crimson'}>Logout</NavButton>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}