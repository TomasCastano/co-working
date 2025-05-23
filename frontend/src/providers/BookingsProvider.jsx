import { createContext, useContext, useState, useEffect } from "react"
import { getBookings as getBookingsRequest, createBooking as createBookingRequest, updateBooking as updateBookingRequest, deleteBooking as deleteBookingRequest } from "../api/bookingsService"
import Cookies from "js-cookie"

const BookingsContext = createContext()

export const BookingsProvider = ({children}) => {
    const [bookings, setBookings] = useState([])
    const [token, setToken] = useState(Cookies.get("token") || null)

    useEffect(() => {
        if (token) {
            getBookingsRequest().then((data) => {
                setBookings(data)
            })
        } else {
            setBookings([])
        }
    }, [token])

    const getBookings = () => {
        if (token) {
            getBookingsRequest().then((data) => {
                setBookings(data)
            })
        } else {
            setBookings([])
        }
    }

    const getBookingById = (id) => {
        return bookings.find((booking) => booking.id === id)
    }

    const createBooking = (booking) => {
        return createBookingRequest(booking).then((data) => {
            return getBookingsRequest().then(updatedBookings => {
                const newBooking = updatedBookings.find(b => b.id === data.id)
                if (newBooking) {
                    setBookings(prevBookings => [...prevBookings, newBooking])
                    return newBooking
                }
                return data
            })
        })
    }

    const updateBooking = (booking, id) => {
        return updateBookingRequest(id, booking).then((data) => {
            return getBookingsRequest().then(updatedBookings => {
                const updatedBooking = updatedBookings.find(b => b.id === parseInt(id))
                if (updatedBooking) {
                    setBookings(prevBookings => 
                        prevBookings.map(b => b.id === parseInt(id) ? updatedBooking : b)
                    )
                    return updatedBooking
                }
                return data
            })
        })
    }

    const deleteBooking = (id) => {
        deleteBookingRequest(id).then(() => {
            setBookings(bookings.filter((booking) => booking.id !== id))
        })
    }

    return (
        <BookingsContext.Provider value={{ 
            bookings, 
            token, 
            setBookings, 
            getBookings, 
            getBookingById, 
            createBooking, 
            updateBooking, 
            deleteBooking 
        }}>
            {children}
        </BookingsContext.Provider>
    )
}

export const useBookings = () => useContext(BookingsContext)