import React, {useState} from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link, withRouter} from 'react-router-dom'
import firebase from '../firebase'


const style = theme =>({
    main: {
        width : 'auto' ,
        display : 'block' ,
        marginLeft : theme.spacing.unit * 3 ,
        marginRight : theme.spacing.unit * 3 ,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]:{
            width : 400 ,
            marginLeft : 'auto' ,
            marginRight : 'auto' , 
        },
    },
    paper: {
        marginTop : theme.spacing.unit * 8,
        display : 'flex' ,
        flexDirection : 'column' ,
        alignItems : 'center' ,
        padding : `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar : {
        margin : theme.spacing.unit,
        backgroundColor : theme.palette.secondary.main,
    },
    form : {
        width : '100%',
        marginTop : theme.spacing.unit,
    },
    submit : {
        marginTop : theme.spacing.unit * 3,
    },
})

function Register(props){
    const {classes} = props

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [quote, setQuote] = useState('')
    
    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant="h4">
                    Register Account
                </Typography>
                <form className={classes.form} onSubmit = {e => e.preventDefault() && false}>
                    <FormControl margin='normal' required fullWidth>
                        <InputLabel htmlfor='name'>Name</InputLabel>
                        <Input id='name' name='name' autoComplete='off' autoFocus value={name} onChange = {e => setName(e.target.value)} />
                    </FormControl>
                    <FormControl margin='normal' required fullWidth>
                        <InputLabel htmlfor='email'>Email</InputLabel>
                        <Input id='email' name='email' autoComplete='off' autoFocus value={email} onChange = {e => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl margin='normal' required fullWidth>
                        <InputLabel htmlfor='password'>Password</InputLabel>
                        <Input id='password' type='password' name='password' autoComplete='off' autoFocus value={password} onChange = {e => setPassword(e.target.value)} />
                    </FormControl>
                    <FormControl margin='normal' required fullWidth>
                        <InputLabel htmlfor='quote'>Quote</InputLabel>
                        <Input name='quote' id='quote' type='text' autoComplete='off' autoFocus value={quote} onChange={e => setQuote(e.target.value)} />
                     </FormControl>
                     <Button 
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={onRegister}
                        className={classes.submit}>
                            Register
                    </Button>
                    <Button 
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='secondary'
                        component={Link}
                        to="/login"
                        className={classes.submit}>
                            Go back to LogIn
                    </Button>
                </form>
            </Paper>
        </main>
    )
    async function onRegister(){
        try{
            await firebase.register(name,email,password)
            await firebase.addQuote(quote)
            props.history.replace('/dashboard')
        }
        catch(error){
            alert(error.message)
        }
    }
}

export default withRouter(withStyles(style)(Register))