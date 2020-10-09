import {
    SET_BANNERS,
	SET_WILAYAH_POPULER,
    SET_WILAYAH,
	SET_DESTINASI,
	SET_VIDEOS,
    SET_BACAAN,
    SET_WISATA,
    SET_AKOMODASI,
    SET_TOUR,
    SET_INFO,
	SET_TENTANG,
} from "../constants/action-types"

export const setBanners = (payload) => ({
    type: SET_BANNERS,
    payload
});

export const setWilayahPopuler = (payload) => ({
    type: SET_WILAYAH_POPULER,
    payload
});

export const setWilayah = (payload) => ({
    type: SET_WILAYAH,
    payload
});

export const setDestinasi = (payload) => ({
    type: SET_DESTINASI,
    payload
});

export const setVideos = (payload) => ({
    type: SET_VIDEOS,
    payload
});

export const setBacaan = (payload) => ({
    type: SET_BACAAN,
    payload
});

export const setWisata = (payload) => ({
    type: SET_WISATA,
    payload
});

export const setAkomodasi = (payload) => ({
    type: SET_AKOMODASI,
    payload
});

export const setTour = (payload) => ({
    type: SET_TOUR,
    payload
});

export const setInfo = (payload) => ({
    type: SET_INFO,
    payload
});

export const setTentang = (payload) => ({
    type: SET_TENTANG,
    payload
});