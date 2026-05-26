import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "@/Todolist";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTodolists} from "@/model/todolists-selectors";


export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(todolist => (
                <Grid key={todolist.id}>
                    <Paper elevation={8} sx={{p: '15px'}}>
                        <Todolist todolist={todolist}
                        />
                    </Paper>
                </Grid>
            ))}
        </>
    )
}