import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/CreateItemForm";
import {createTodolistAC} from "@/model/todolists-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {Todolists} from "@/Todolists";

export const Main = () => {

    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{p: "15px 0"}}>
                <CreateItemForm createTitle={createTodolist} minTitleLength={5} maxTitleLength={20}/>
            </Grid>
            <Grid container spacing={6}>
                <Todolists/>
            </Grid>
        </Container>
    )
}