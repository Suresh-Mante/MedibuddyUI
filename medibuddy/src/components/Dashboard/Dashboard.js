import React, { useEffect, useState } from "react"
import AppTitle from "../Header/AppTitle";
import { Department_API, DOCTOR_API, Nurse_API, OPD_PATIENT_API, PATIENT_API, ROOM_API, WARD_API } from '../Env';
import { getDataFromServer } from '../DataAccess';
import patientLogo from '../../images/patient.png';
import doctorLogo from '../../images/doctor.png';
import nurseLogo from '../../images/nurse.png';
import departmentLogo from '../../images/department.png';
import wardLogo from '../../images/ward.png';
import roomLogo from '../../images/room.png';
import DashboardItem from './DashboardItem';
const Dashboard = () => {
    const [patients, setPatients] = useState(null);
    const [doctors, setDoctors] = useState(null);
    const [nurses, setNurses] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [OPDPatients, setOPDPatients] = useState(null);
    const [wards, setWards] = useState(null);
    const [rooms, setRooms] = useState(null);

    const getPatients = async () => {
        const response = await getDataFromServer(PATIENT_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const patients = response.records;
                setPatients(patients);
            } else { }
        } else { }
    }
    const getDoctors = async () => {
        const response = await getDataFromServer(DOCTOR_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const doctors = response.records;
                setDoctors(doctors);
            } else { }
        } else { }
    }
    const getNurses = async () => {
        const response = await getDataFromServer(Nurse_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const nurses = response.records;
                setNurses(nurses);
            } else { }
        } else { }
    }
    const getDepartments = async () => {
        const response = await getDataFromServer(Department_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const departments = response.records;
                setDepartments(departments);
            } else { }
        } else { }
    }
    const getOPDPatients = async () => {
        const response = await getDataFromServer(OPD_PATIENT_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const OPDPatients = response.records;
                setOPDPatients(OPDPatients);
            } else { }
        } else { }
    }
    const getWards = async () => {
        const response = await getDataFromServer(WARD_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const wards = response.records;
                setWards(wards);
            } else { }
        } else { }
    }
    const getRooms = async () => {
        const response = await getDataFromServer(ROOM_API, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const rooms = response.records;
                setRooms(rooms);
            } else { }
        } else { }
    }

    useEffect(() => {
        if (patients == null) {
            getPatients();
        }
    }, [patients]);
    useEffect(() => {
        if (doctors == null) {
            getDoctors();
        }
    }, [doctors]);
    useEffect(() => {
        if (nurses == null) {
            getNurses();
        }
    }, [patients]);
    useEffect(() => {
        if (departments == null) {
            getDepartments();
        }
    }, [patients]);
    useEffect(() => {
        if (OPDPatients == null) {
            getOPDPatients();
        }
    }, [OPDPatients]);
    useEffect(() => {
        if (wards == null) {
            getWards();
        }
    }, [wards]);
    useEffect(() => {
        if (rooms == null) {
            getRooms();
        }
    }, [rooms]);
    return (
        <>
            <AppTitle title={'App Dashboard'} />
            <div className="dashboard-grid">
                <DashboardItem item={patients} redirectTo={'/Patient'} title={'Patients'} image={patientLogo} />
                <DashboardItem item={doctors} redirectTo={'/Doctor'} title={'Doctors'} image={doctorLogo} />
                <DashboardItem item={nurses} redirectTo={'/Nurse'} title={'Nurses'} image={nurseLogo} />
                <DashboardItem item={departments} redirectTo={'/Department'} title={'Departments'} image={departmentLogo} />
                <DashboardItem item={OPDPatients} redirectTo={'/OPDPatient'} title={'OPDPatients'} image={patientLogo} />
                <DashboardItem item={wards} redirectTo={'/Ward'} title={'Wards'} image={wardLogo} />
                <DashboardItem item={rooms} redirectTo={'/Room'} title={'Rooms'} image={roomLogo} />
            </div>
        </>
    );
}

export default Dashboard;