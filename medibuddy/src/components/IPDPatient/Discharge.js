import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDataFromServer } from "../DataAccess";
import { DOCTOR_API, MEDICINE_API, IPDMEDICINE_API, IPDTest_API, IPD_PATIENT_API, PATIENT_API, TEST_API, NURSE_API, ROOM_API } from "../Env";
import Loading from "../Shared/Loading";
import { formatDate } from "../Utils";

const Discharge = () => {
    var IPDPatient = null;
    // var IPDPatient = {
    //     "id": 3,
    //     "pid": 1,
    //     "docId": 1,
    //     "nurseID": 101,
    //     "entryDate": "2022-09-22T00:00:00",
    //     "exitDate": null,
    //     "roomID": 1,
    //     "discharged": false
    // };
    const location = useLocation();
    if (location && location.state) {
        IPDPatient = location.state
    }
    const [patient, setPatient] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [room, setRoom] = useState(null);
    const [nurse, setNurse] = useState(null);
    const [tests, setTests] = useState(null);
    const [medicines, setMedicines] = useState(null);

    const totalBillAmount = () => {
        if (doctor != null && tests != null && medicines != null && room != null) {
            let doctorFees = doctor.fees;
            let roomCharges = room.rate * Math.ceil(
                (new Date().getTime() - new Date(IPDPatient.entryDate).getTime())
                /
                (1000 * 3600 * 24)
            );
            let testBill = tests.reduce((sum, curr) => sum + curr.price, 0);
            let medicineBill = medicines.reduce((sum, curr) => sum + curr.price, 0);

            return doctorFees + testBill + medicineBill + roomCharges;
        } else {
            return 0;
        }
    }

    const getTest = async (id) => {
        const response = await getDataFromServer(`${TEST_API}/${id}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                return response.record;
            } else { return null; }
        } else { return null; }
    }

    const getTests = async () => {
        const response = await getDataFromServer(`${IPDTest_API}/${IPDPatient.id}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const tests = response.records;
                for (let i = 0; i < tests.length; i++) {
                    tests[i] = await getTest(tests[i].testID);
                }
                setTests(tests);
            } else { }
        } else { }
    }

    useEffect(() => {
        if (tests == null) {
            getTests();
        }
    }, []);

    const getMedicine = async (id) => {
        const response = await getDataFromServer(`${MEDICINE_API}/${id}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                return response.record;
            } else { return null; }
        } else { return null; }
    }

    const getMedicines = async () => {
        const response = await getDataFromServer(`${IPDMEDICINE_API}/${IPDPatient.id}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const medicines = response.records;
                for (let i = 0; i < medicines.length; i++) {
                    medicines[i] = await getMedicine(medicines[i].medicineID);
                }
                setMedicines(medicines);
            } else { }
        } else { }
    }

    useEffect(() => {
        if (medicines == null) {
            getMedicines();
        }
    }, []);

    const getPatient = async () => {
        const response = await getDataFromServer(`${PATIENT_API}/${IPDPatient.pid}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const patient = response.record;
                setPatient(patient);
            } else { }
        } else { }
    }

    useEffect(() => {
        if (patient == null) {
            getPatient();
        }
    }, []);

    const getDoctor = async () => {
        const response = await getDataFromServer(`${DOCTOR_API}/${IPDPatient.docId}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const doctor = response.record;
                setDoctor(doctor);
            } else { }
        } else { }
    }

    const getNurse = async () => {
        const response = await getDataFromServer(`${NURSE_API}/${IPDPatient.nurseID}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const nurse = response.record;
                setNurse(nurse);
            } else { }
        } else { }
    }

    const getRoom = async () => {
        const response = await getDataFromServer(`${ROOM_API}/${IPDPatient.roomID}`, 'GET');
        if (response) {
            if (response.statusCode == 200) {
                const room = response.record;
                setRoom(room);
            } else { }
        } else { }
    }

    useEffect(() => {
        if (doctor == null) {
            getDoctor();
        }
    }, []);

    useEffect(() => {
        if (nurse == null) {
            getNurse();
        }
    }, []);

    useEffect(() => {
        if (room == null) {
            getRoom();
        }
    }, []);

    const DischargePatient = async () => {
        const response = await getDataFromServer(`${IPD_PATIENT_API}/Discharge/${IPDPatient.id}`, 'POST');
        if (response) {
            if (response.statusCode == 200) {
                window.location.href = '/IPDPatient';
            } else { }
        } else { }
    }
    return (
        <>
            <div className="flex flex-align-center">
                <Link to={'/IPDPatient'}>
                    <svg viewBox="0 0 24 24" className='icon circle-bg' width='24px' height='24px'
                        style={{ marginRight: '5px' }}>
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                            fill='currentColor'></path></svg>
                </Link>
                <div className='app-title flex flex-row flex-align-center flex-justify-center'>
                    <span id='app-title-text'>{'Discharge Patient'}</span>
                </div>
            </div>

            <div className="container m-2 flex flex-column" style={{
                gap: '20px'
            }}>
                <div className="form-group">
                    <div style={{ fontSize: '20px' }}>Patient Details</div>
                    {
                        patient ?
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Mobile</td>
                                        <td>Email</td>
                                        <td>Admission Date</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{`${patient.firstName} ${patient.midName} ${patient.lastName}`}</td>
                                        <td>{patient.mobile}</td>
                                        <td>{patient.email}</td>
                                        <td>{formatDate(new Date(IPDPatient.entryDate))}</td>
                                    </tr>
                                </tbody>
                            </table>
                            : <Loading />
                    }
                </div>
                <div className="form-group">
                    <div style={{ fontSize: '20px' }}>Doctor Details</div>
                    {
                        doctor ?
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Mobile</td>
                                        <td>Email</td>
                                        <td>Fees</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.mobile}</td>
                                        <td>{doctor.email}</td>
                                        <td>???{doctor.fees}</td>
                                    </tr>
                                </tbody>
                            </table>
                            : <Loading />
                    }
                </div>
                <div className="form-group">
                    <div style={{ fontSize: '20px' }}>Nurse Details</div>
                    {
                        nurse ?
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Mobile</td>
                                        <td>Email</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{nurse.name}</td>
                                        <td>{nurse.mobile}</td>
                                        <td>{nurse.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                            : <Loading />
                    }
                </div>
                <div className="form-group">
                    <div style={{ fontSize: '20px' }}>Room Details</div>
                    {
                        room ?
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Type</td>
                                        <td>Rate</td>
                                        <td>Ward Id</td>
                                        <td>No of days</td>
                                        <td>Room Charges</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{room.type}</td>
                                        <td>???{room.rate}</td>
                                        <td>{room.wardId}</td>
                                        <td>{Math.ceil(
                                            (new Date().getTime() - new Date(IPDPatient.entryDate).getTime())
                                            /
                                            (1000 * 3600 * 24))}</td>
                                        <td>???{room.rate * Math.ceil(
                                            (new Date().getTime() - new Date(IPDPatient.entryDate).getTime())
                                            /
                                            (1000 * 3600 * 24))}</td>
                                    </tr>
                                </tbody>
                            </table>
                            : <Loading />
                    }
                </div>
                <div className="form-group">
                    <div style={{ fontSize: '20px' }}>Tests Details</div>
                    {
                        tests ?
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tests.map((test, index) => (
                                            <tr key={index}>
                                                <td>{test.name}</td>
                                                <td>???{test.price}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td>Total</td>
                                        <td>???{tests.reduce((sum, curr) => {
                                            return sum + curr.price;
                                        }, 0)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            : <Loading />
                    }
                </div>
                <div className="form-group">
                    <div style={{ fontSize: '20px' }}>Medicine Details</div>
                    {
                        medicines ?
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        medicines.map((medicine, index) => (
                                            <tr key={index}>
                                                <td>{medicine.name}</td>
                                                <td>???{medicine.price}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td>Total</td>
                                        <td>???{medicines.reduce((sum, curr) => {
                                            return sum + curr.price;
                                        }, 0)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            : <Loading />
                    }
                </div>
                {
                    patient && doctor && tests && medicines &&
                    <div style={{ fontSize: '20px', gap: '10px' }} className='flex flex-align-center'>
                        <span>Total bill amount: ???{totalBillAmount()}</span>
                        <button className="btn btn-primary" onClick={DischargePatient}>Discharge Patient</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Discharge;