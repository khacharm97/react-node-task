import toast from 'react-hot-toast'
import * as api from '../api'
import { start, end, error, registerReducer, loginReducer, logoutReducer, getUserReducer, getClientsReducer, getUsersReducer, getEmployeesReducer, createClientReducer, createEmployeeReducer, updateUserReducer, deleteUserReducer, } from '../reducer/user'
import Cookies from 'js-cookie'
import walletService from '../../utils/walletService'

export const register = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.register(userData)
        dispatch(registerReducer(data.result))
        navigate('/auth/login')
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const login = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.login(userData)
        const { token, ...result } = data.result
        Cookies.set('crm_profile', JSON.stringify(data.result))
        dispatch(loginReducer(result))
        navigate('/')
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const changePassword = (passwordData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.changePassword(passwordData)
        dispatch(loginReducer(data.result))
        navigate('/')
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const forget_password = (email) => async (dispatch) => {
    try {
        dispatch(start())
        await api.forget_password(email)
        localStorage.setItem('otpSendToEmail', JSON.stringify(email))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const newpassword = ({ otp, password }, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const emailObject = localStorage.getItem('otpSendToEmail')
        const emailObject2 = JSON.parse(emailObject)
        const email = emailObject2.email

        await api.newpassword({ email, otp, password })
        localStorage.removeItem('otpSendToEmail')
        navigate('/auth/login')
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const logout = (navigate) => async (dispatch) => {
    try {
        dispatch(start())
        Cookies.remove('crm_profile')
        dispatch(logoutReducer())
        navigate('/auth/login')
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUsers()
        dispatch(getUsersReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getClients = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getClients()
        dispatch(getClientsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployeeClients = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployeeClients()
        dispatch(getClientsReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getEmployees = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getEmployees()
        dispatch(getEmployeesReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const getUser = (userId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUser(userId)
        dispatch(getUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createClient = (clientData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createClient(clientData)
        dispatch(createClientReducer(data.result))
        setOpen(false)
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const createEmployee = (employeeData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.createEmployee(employeeData)
        dispatch(createEmployeeReducer(data.result))
        setOpen(false)
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const updateRole = (userId, role) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateRole(userId, role)
        dispatch(updateUserReducer(data.result))

        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const updateUser = (userId, userData, role) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateUser(userId, userData)
        dispatch(updateUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}
export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteUser(userId)
        dispatch(deleteUserReducer(data.result))
        dispatch(end())
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Something went wrong"
        toast.error(message)
        dispatch(error(err.message))
    }
}

// Wallet login actions
export const connectWallet = () => async (dispatch) => {
    try {
        dispatch(start())
        const result = await walletService.connectWallet()
        
        if (result.success) {
            dispatch(end())
            return { success: true, account: result.account }
        } else {
            toast.error(result.error)
            dispatch(error(result.error))
            return { success: false, error: result.error }
        }
    } catch (err) {
        const message = err?.message || "Failed to connect wallet"
        toast.error(message)
        dispatch(error(err.message))
        return { success: false, error: message }
    }
}

export const loginWithWallet = (account, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        
        // Step 1: Get nonce from server
        const nonceResponse = await api.getNonce(account)
        const { nonce, message } = nonceResponse.data
        // Step 2: Sign the message with MetaMask
        const signature = await walletService.signMessage(message)
        
        // Step 3: Send signature to backend for verification
        const walletData = {
            walletAddress: account,
            signature: signature,
            message: message,
            nonce: nonce,
        }
        
        // Call the backend API
        const { data } = await api.walletLogin(walletData)
        const { token, ...result } = data.result
        
        // Store in cookies like regular login
        Cookies.set('crm_profile', JSON.stringify(data.result))
        dispatch(loginReducer(result))
        navigate('/')
        dispatch(end())
        
        toast.success('Successfully logged in with wallet!')
        
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || "Failed to login with wallet"
        toast.error(message)
        dispatch(error(err.message))
    }
}

export const disconnectWallet = (navigate) => async (dispatch) => {
    try {
        dispatch(start())
        walletService.disconnectWallet()
        Cookies.remove('crm_profile')
        dispatch(logoutReducer())
        navigate('/auth/login')
        dispatch(end())
        toast.success('Wallet disconnected successfully')
    } catch (err) {
        const message = err?.message || "Failed to disconnect wallet"
        toast.error(message)
        dispatch(error(err.message))
    }
}