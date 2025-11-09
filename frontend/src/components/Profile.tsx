import React, { useState, useEffect, useCallback, FC, ReactElement } from 'react';
import {
	Phone,
	MapPin,
	Calendar,
	LogOut,
	ChevronRight,
	FileText,
	Settings,
	Bell,
	Download
} from "lucide-react";
import { AppointmentDetails, Doctor, Patient, PatientInfo } from '@/types/type';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LoadingPage: FC = () => (
	<div className="min-h-screen bg-slate-50 flex items-center justify-center">
		<div className="flex items-center space-x-2 text-emerald-600">
			<svg className="animate-spin h-6 w-6 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
				<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			<p className="text-xl font-semibold">Loading Profile...</p>
		</div>
	</div>
);

interface InfoItemProps {
	icon: ReactElement;
	label: string;
	value: string | number;
}

const InfoItem: FC<InfoItemProps> = ({ icon, label, value }) => (
	<div className="flex items-center">
		<div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full">
			{icon}
		</div>
		<div className="ml-4">
			<p className="text-sm font-semibold text-slate-500">{label}</p>
			<p className="text-md font-bold text-slate-800">{value}</p>
		</div>
	</div>
);

interface ProfileCardProps {
	user: Patient;
}
const ProfileCard: FC<ProfileCardProps> = ({ user }) => {
	const router = useRouter();
	const [imgSrc, setImgSrc] = useState(user.profileUrl || "/images/default-profile.png");
	const openSettings = useCallback(() => {
		openRegistrationForm();
	}, [user.id, router]);

	const openRegistrationForm = () => {
		router.push('/register/patient');
	}

	return (
		<div className="bg-white rounded-2xl shadow-xl p-8 text-center">
			<img
				src={imgSrc}
				alt="User Profile"
				className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-emerald-200"
				onError={() => setImgSrc("/images/user-profile.png")}
			/>
			<h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
			<p className="text-slate-600 mt-1">{user.email}</p>

			<div className="mt-8 text-left space-y-4">
				{
					(user.age === undefined || user.phone === undefined || user.address === undefined) ? (
						<div className="flex justify-center mt-4">
							<button
								className="px-4 py-2 cursor-pointer bg-emerald-600 text-white font-medium rounded-lg shadow hover:bg-emerald-700 transition duration-200"
								onClick={openRegistrationForm}
							>
								Complete Details
							</button>
						</div>
					) : (
						<>
							<InfoItem icon={<Calendar size={20} />} label="Age" value={user.age} />
							<InfoItem icon={<Phone size={20} />} label="Phone" value={user.phone} />
							<InfoItem icon={<MapPin size={20} />} label="Address" value={user.address} />
						</>
					)
				}
			</div>
			<button
				onClick={openSettings}
				className="mt-8 w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
			>
				Edit Profile
			</button>
		</div>
	);
}

interface DashboardNavProps {
	user: Patient;
}
const DashboardNav: FC<DashboardNavProps> = ({ user }) => {
	const router = useRouter();
	const navItems = [
		{ icon: <FileText />, text: "Medical Records" },
		{ icon: <Bell />, text: "Notifications" },
		{ icon: <Settings />, text: "Account Settings" },
	];

	const handleClick = useCallback((name: string) => {
		if (name === "Account Settings") {
			router.push(`/settings?id=${user.id}`);
		} else if (name === "Notifications") {
			router.push(`/settings?id=${user.id}`)
		} else if (name === "Medical Records") {
			router.push('/profile#records');
		}
	}, [user.id, router]);

	return (
		<div className="bg-white rounded-2xl shadow-xl p-8">
			<h2 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{navItems.map(item => (
					<div
						key={item.text}
						onClick={() => handleClick(item.text)}
						className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg text-center cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
					>
						<div className="text-emerald-500 mb-2">{React.cloneElement(item.icon, { size: 32, strokeWidth: 1.5 })}</div>
						<p className="font-semibold text-sm">{item.text}</p>
					</div>
				))}
			</div>
		</div>
	);
};

interface AppointmentCardProps {
	appointment: AppointmentDetails;
}
const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
	const router = useRouter();
	const openAppointment = useCallback(() => {
		router.push(`/appointments?id=${appointment.id}`);
	}, [appointment.id, router]);

	const doctorName = appointment.doctor?.name || "Unknown Doctor";
	const specialty = appointment.doctor?.specialty || "N/A";

	return (
		<div onClick={openAppointment} className="bg-slate-50 p-4 rounded-lg flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer">
			<div className="flex items-center">
				<div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg">
					<Calendar size={24} />
				</div>
				<div className="ml-4">
					<p className="font-bold text-slate-800">{doctorName}</p>
					<p className="text-sm text-slate-600">{specialty}</p>
					<p className="text-sm text-slate-600 font-semibold">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {appointment.time}</p>
				</div>
			</div>
			<ChevronRight className="text-slate-400" />
		</div>
	);
}

interface UpcomingAppointmentsProps {
	appointments: AppointmentDetails[];
}
const UpcomingAppointments: FC<UpcomingAppointmentsProps> = ({ appointments }) => {
	return (
		<div className="bg-white rounded-2xl shadow-xl p-8">
			<h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Appointments</h2>
			<div className="space-y-4">
				{(appointments && appointments.length > 0) ? (
					appointments.map((appt, index) => <AppointmentCard key={index} appointment={appt} />)
				) : (
					<p className="text-slate-600 text-center py-4">You have no upcoming appointments.</p>
				)}
			</div>
		</div>
	);
}

interface RecordCardProps {
	record: AppointmentDetails;
}
const RecordCard: FC<RecordCardProps> = ({ record }) => (
	<div className="bg-slate-50 p-4 rounded-lg flex items-center justify-between hover:bg-slate-100 transition-colors">
		<div className="flex items-center">
			<div className="bg-slate-200 text-slate-600 p-3 rounded-lg">
				<FileText size={24} />
			</div>
			<div className="ml-4">
				<p className="font-bold text-slate-800">{record.type}</p>
				<p className="text-sm text-slate-600">with Dr. {record.doctor?.name} ({record.doctor?.specialty})</p>
				<p className="text-sm text-slate-600 font-semibold">{new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
			</div>
		</div>
		<a href={record.reportUrl} target="_blank" rel="noopener noreferrer" className="flex items-center font-semibold text-emerald-600 hover:text-emerald-800">
			<Download size={18} className="mr-2" />
			View Report
		</a>
	</div>
);

interface MedicalRecordsProps {
	records: AppointmentDetails[];
}
const MedicalRecords: FC<MedicalRecordsProps> = ({ records }) => (
	<div id="records" className="bg-white rounded-2xl shadow-xl p-8">
		<h2 className="text-2xl font-bold text-slate-900 mb-6">Medical Records</h2>
		<div className="space-y-4">
			{(records && records.length) > 0 ? (
				records.map((record, index) => <RecordCard key={index} record={record} />)
			) : (
				<p className="text-slate-600 text-center py-4">You have no past medical records.</p>
			)}
		</div>
	</div>
);

const Profile: FC = () => {
	const [user, setUser] = useState<Patient | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	const { logout, getPatient } = useAuth();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await getPatient();

				if (!data) {
					toast.info("Token expired! Please Sign In again to continue.");
					logout();
					router.replace('/login');
				}

				console.log(data);
				setUser(data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching patient data:", error);
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, []);

	const handleLogout = () => {
		logout();
		toast.success('Logged out successfully!');
		router.replace('/');
	}

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!user) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<p className="text-xl text-slate-600">Could not load user profile.</p>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased mt-10">
			<main className="container mx-auto px-4 sm:px-6 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<aside className="lg:col-span-1 space-y-8">
						<ProfileCard user={user} />
						<button onClick={handleLogout} className="w-full flex items-center justify-center font-semibold bg-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-rose-500 hover:text-white transition-colors cursor-pointer">
							<LogOut className="mr-2" size={20} /> Log Out
						</button>
					</aside>

					<div className="lg:col-span-2 space-y-8">
						<DashboardNav user={user} />
						<UpcomingAppointments appointments={user.upcomingAppointments} />
						<MedicalRecords records={user.medicalRecords} />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Profile;