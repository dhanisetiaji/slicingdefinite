import React, { useEffect, useRef, useState } from 'react'
import MiraChat from '../components/MiraChat'
import Navbar from '../components/Navbar'
import './home.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMapSharp } from 'react-icons/io5'
import { HiPhone } from 'react-icons/hi'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'

const IndexHome = () => {
    const [query, setQuery] = useSearchParams()

    const myRef = useRef(null)
    const [provinces, setProvinces] = useState([]),
        [loading, setLoading] = useState(false),
        [selectData, setSelectData] = useState({
            phone: '',
            services: [],
            showroom_operational_hours: [],
            bengkel_operational_hours: [],
        }),
        [data, setData] = useState({
            data: [],
        }),
        [form, setForm] = useState({
            province: query.get('province') ?? '',
            page: 1,
            limit: query.get('limit') ?? 9,
            latlong: '',
        })



    const getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            if (query.get('province') !== null) {
                setForm({
                    ...form,
                    latlong: ``,
                })
            } else {
                setForm({
                    ...form,
                    latlong: `${position.coords.latitude},${position.coords.longitude}`,
                })
            }
        },
            (error) => {
                setForm({
                    ...form,
                    latlong: ``,
                })
            })
    }

    const getProvinces = async () => {
        try {
            const res = await axios.get('https://mitsubishi-50.sudahdistaging.in/api/frontend/get-provinces')
            setProvinces(res.data)
        } catch (error) {
        }
    }

    const getData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://mitsubishi-50.sudahdistaging.in/api/frontend/search-dealers?latlong=${form.latlong}&keyword=${form.province}&page=${form.page}&limit=${form.limit}`)
            setData(res.data)
            setLoading(false)
        } catch (error) {
        }
    }

    useEffect(() => {
        getProvinces()
        getGeoLocation()
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.latlong, form.province, form.limit])


    const handleSearch = (e) => {
        setLoading(true)
        setForm({ ...form, province: e.target.value, latlong: '', limit: 9 })
        query.set('province', e.target.value)
        query.set('limit', form.limit)
        setQuery(query)
        setLoading(false)
    }

    const handleLoadMore = () => {
        setForm({ ...form, limit: form.limit + 9 })
        query.set('limit', form.limit + 9)
        setQuery(query)
        myRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const handleModal = (item) => {
        setSelectData(item)
        document.getElementById('mymodal').checked = true
    }

    return (<>
        <Navbar />
        <div className="main-section">
            <div className="banner">
                <img src="../../images/banner.png" alt="banner" />
            </div>
            <div className="container">
                <div className="dealers">
                    <div className="dealer">
                        <h4 className='title'>Find dealer</h4>
                    </div>
                    <div className="dealer">
                        <p>Cari dan kunjungi dealer resmi Mitsubishi terdekat di kota Anda untuk mendapatkan pelayanan terbaik terkait dengan kendaraan dari Mitsubishi Motors Indonesia.</p>
                    </div>
                </div>
                <div className="locations">
                    <p>Discover the nearest dealership in your area</p>
                    <AiOutlineSearch className="iconSearch" />
                    <select value={form.province} onChange={(e) => handleSearch(e)}>
                        <option value={''} disabled>Pilih lokasi terdekat</option>
                        {loading ? (
                            <option value={form.province} disabled>Loading...</option>
                        ) : (
                            provinces.map((province, index) => (
                                <option key={index} value={province.name}>{province.name}</option>
                            ))
                        )}
                    </select>
                </div>
                <div className="main-content">
                    {loading ? (<>
                        <div className="content">
                        </div>
                        <div className="content">
                        </div>
                        <div className="content">
                        </div>
                    </>) : data.data.length > 0 ? (
                        data.data.map((item, index) => {
                            return (
                                <div className="content" onClick={() => handleModal(item)} key={index}>
                                    <div className="itemContent">
                                        <div className="item mr-1">
                                            <img src="../../images/pin.png" alt="ping" />
                                        </div>
                                        <div className="item">
                                            <div className="title">{item.title}</div>
                                            <div className="address">{item.address}</div>
                                            <div className="service" key={index}>
                                                {item.services.map((service, index) => {
                                                    if (item.services.length === index + 1) {
                                                        return (
                                                            <div key={index} className="itemService">
                                                                {service}
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div key={index} className="itemService">
                                                                {service} <span className='bulletService'>&#8226;</span>
                                                            </div>
                                                        )
                                                    }

                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="content">
                            <h4>Dealer tidak ditemukan</h4>
                        </div>
                    )}
                </div>
                <div className="text-center mt-2">
                    {loading ? (
                        <button className="loading-spinner" disabled></button>
                    ) : (
                        <button onClick={() => handleLoadMore()} ref={myRef}>Load More</button>
                    )}
                </div>
                <div className="info-section">
                    <img src="../../images/section.png" alt="info" />
                </div>
            </div>
        </div>
        <Footer />
        <MiraChat />
        <input className="modal-state" id="mymodal" type="checkbox" />
        <div className="modal">
            <label className="modal__bg" onClick={() => { document.getElementById('mymodal').checked = false }}></label>
            <div className="modal__inner">
                <label className="modal__close" onClick={() => { document.getElementById('mymodal').checked = false }}></label>
                <div className="modal__content">
                    <img src="../../images/pin1.png" alt="pin" />
                    <div className="content">
                        <div className="service">
                            {selectData.services.map((service, index) => {
                                if (selectData.services.length === index + 1) {
                                    return (
                                        <div key={index} className="itemService">
                                            {service}
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index} className="itemService">
                                            {service} <span className='bulletService'>&#8226;</span>
                                        </div>
                                    )
                                }

                            })}
                        </div>
                        <div className="title">{selectData.title}</div>
                        <div className="addressWrapper">
                            <div className="address">{selectData.address}</div>
                            <div className="distance">{selectData.distance_km} km</div>
                        </div>
                        <a className='mapView' href={`https://www.google.com/maps/dir/Current+Location/${selectData.latitude},${selectData.longitude}`} target={'_blank'} rel="noopener noreferrer">
                            <IoMapSharp className='icon' />View Direction
                        </a>
                        <div className="buttonContent">
                            <button>Request Test Drive</button>
                            <button className='btnSecondary'>Book Service</button>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <hr />
                    <div className="operational">
                        {selectData.showroom_operational_hours.length > 0 ? (
                            <div className="item">
                                <div className="title">Showroom</div>
                                <div className="operationalHours">
                                    <div className="days">{selectData.showroom_operational_hours[0].days}</div>
                                    <div className="hour">{selectData.showroom_operational_hours[0].hours}</div>
                                </div>
                            </div>
                        ) : ''}
                        {selectData.bengkel_operational_hours.length > 0 ? (
                            <div className="item">
                                <div className="title">Bengkel</div>
                                <div className="operationalHours">
                                    <div className="days">{selectData.bengkel_operational_hours[0].days}</div>
                                    <div className="hour">{selectData.bengkel_operational_hours[0].hours}</div>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                    <div className="wrapperContact">
                        <div className="title">Contact</div>
                        <div className="detailContact">
                            <div className="item">
                                <HiPhone className='icon' />
                            </div>
                            <div className="phone">{selectData.phone}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default IndexHome