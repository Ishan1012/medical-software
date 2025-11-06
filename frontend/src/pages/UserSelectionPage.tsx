import { UserType } from '@/types/type';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react'

type UserSelectionProps = {
    setUserType?: Dispatch<SetStateAction<UserType | null>>;
};

const UserSelectionPage: React.FC<UserSelectionProps> = ({ setUserType }) => {
    const router = useRouter();

    const showLogin = () => {
        router.push('/login');
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100/50 font-sans text-emerald-900 leading-relaxed pb-10 pt-20">
            <div className="max-w-2xl w-full px-6 animate-fadeInUp">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-900 mb-3">
                        Welcome to WellNest
                    </h1>
                    <p className="text-lg md:text-xl text-emerald-800/80 font-normal">
                        Choose how you&apos;d like to join our platform
                    </p>
                </div>

                {/* Choices */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Patient Card */}
                    <div
                        onClick={() => setUserType && setUserType("Patient")}
                        className="relative bg-white rounded-2xl p-8 md:p-10 text-center cursor-pointer transition-all duration-300 ease-out shadow-sm hover:shadow-2xl hover:-translate-y-1 border-emerald-500 border-2 active:translate-y-0 group overflow-hidden"
                    >
                        <div className="w-12 h-12 mx-auto mb-5 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 transition-all duration-300 group-hover:scale-105 group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:text-white">
                            👤
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold text-emerald-900 mb-2 tracking-tight">
                            Patient
                        </h2>
                        <p className="text-sm md:text-base text-emerald-800/70 leading-relaxed">
                            Book appointments, manage your health records, and connect with healthcare providers
                        </p>
                        {/* Hover shimmer effect */}
                        <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent transition-all duration-500 group-hover:left-full"></div>
                    </div>

                    {/* Doctor Card */}
                    <div
                        onClick={() => setUserType && setUserType("Doctor")}
                        className="relative bg-white rounded-2xl p-8 md:p-10 text-center cursor-pointer transition-all duration-300 ease-out shadow-sm hover:shadow-2xl hover:-translate-y-1 border-emerald-500 border-2 active:translate-y-0 group overflow-hidden"
                    >
                        <div className="w-12 h-12 mx-auto mb-5 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 transition-all duration-300 group-hover:scale-105 group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:text-white">
                            👩‍⚕️
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold text-emerald-900 mb-2 tracking-tight">
                            Doctor
                        </h2>
                        <p className="text-sm md:text-base text-emerald-800/70 leading-relaxed">
                            Manage your practice, schedule appointments, and provide care to your patients
                        </p>
                        {/* Hover shimmer effect */}
                        <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent transition-all duration-500 group-hover:left-full"></div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-emerald-800/60 text-sm">
                    Already have an account?{" "}
                    <a
                        href="#"
                        onClick={() => showLogin()}
                        className="text-emerald-500 font-medium hover:text-emerald-600 transition-colors"
                    >
                        Sign in here
                    </a>
                </div>
            </div>
        </main>
    )
}

export default UserSelectionPage;