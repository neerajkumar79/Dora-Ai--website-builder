import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const API = import.meta.env.VITE_SERVER_URL

const LoginModal = ({ open, onClose }) => {
    const dispatch = useDispatch()
    const canLogin = Boolean(auth)

    const handleGoogleAuth = async () => {
        if (!auth) {
            alert('Firebase not configured. Use guest login.')
            return
        }

        try {
            const result = await signInWithPopup(auth, provider)

            console.log('Google auth success:', result.user)

            const { data } = await axios.post(
                `${API}/api/auth/google`,
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    avatar: result.user.photoURL
                },
                {
                    withCredentials: true
                }
            )

            dispatch(setUserData(data))
            onClose()
        } catch (error) {
            console.error('Google login error:', error.code, error.message)

            if (error.code === 'auth/popup-closed-by-user') {
                // user closed popup
            } else {
                alert(`Login failed: ${error.message}. Try guest login.`)
            }
        }
    }

    const handleFallbackLogin = async () => {
        try {
            const { data } = await axios.post(
                `${API}/api/auth/google`,
                {
                    name: 'Dora AI Guest',
                    email: 'guest@dora.ai',
                    avatar: 'https://ui-avatars.com/api/?name=Dora+AI+Guest'
                },
                {
                    withCredentials: true
                }
            )

            dispatch(setUserData(data))
            onClose()
        } catch (error) {
            console.error('Guest login error:', error)
        }
    }

    return (
        <div>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 flex z-100 items-center justify-center bg-black/80 backdrop-blur-xl px-4"
                >
                    <motion.div
                        initial={{ scale: 0.88, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="relative w-full max-w-md p-px rounded-3xl bg-linear-to-br from-purple-500/40 via-blue-500/30 to-transparent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden">
                            <motion.div
                                animate={{ opacity: [0.25, 0.4, 0.25] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
                            />

                            <motion.div
                                animate={{ opacity: [0.2, 0.35, 0.2] }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    delay: 2
                                }}
                                className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 blur-[140px]"
                            />

                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg"
                            >
                                <X />
                            </button>

                            <div className="relative px-8 pt-14 pb-10 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm text-gray-300">
                                        AI Website Builder
                                    </span>
                                </div>

                                <h2 className="text-3xl font-semibold leading-tight mb-3 space-x-2">
                                    <span className="text-white">
                                        Welcome to
                                    </span>
                                    <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        Dora AI
                                    </span>
                                </h2>

                                <motion.button
                                    onClick={handleGoogleAuth}
                                    whileHover={{
                                        scale: canLogin ? 1.04 : 1
                                    }}
                                    whileTap={{
                                        scale: canLogin ? 0.96 : 1
                                    }}
                                    disabled={!canLogin}
                                    className={`group relative w-full h-13 rounded-xl font-semibold shadow-xl overflow-hidden ${
                                        canLogin
                                            ? 'bg-white text-black'
                                            : 'bg-white/10 text-zinc-500 cursor-not-allowed'
                                    }`}
                                >
                                    <div className="relative flex items-center justify-center gap-3">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
                                            alt="Google"
                                            className="h-5 w-5"
                                        />
                                        Continue with Google
                                    </div>
                                </motion.button>

                                {!canLogin && (
                                    <>
                                        <p className="mt-4 text-sm text-red-400">
                                            Firebase is not configured. You can
                                            use the fallback login below.
                                        </p>

                                        <motion.button
                                            onClick={handleFallbackLogin}
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            className="mt-4 w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                                        >
                                            Continue as Guest
                                        </motion.button>
                                    </>
                                )}

                                <div className="flex items-center gap-4 my-10">
                                    <div className="h-px flex-1 bg-white/10" />
                                    <span className="text-xs tracking-tight text-zinc-500">
                                        Secure Login
                                    </span>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>

                                <p className="text-xs text-zinc-500 leading-relaxed">
                                    By continuing you agree to our{' '}
                                    <span className="underline cursor-pointer hover:text-zinc-300">
                                        Terms of Services
                                    </span>{' '}
                                    and{' '}
                                    <span className="underline cursor-pointer hover:text-zinc-300">
                                        Privacy Policy
                                    </span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}

export default LoginModal