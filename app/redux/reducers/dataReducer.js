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

const initialState = {
    dataBanners: [],
    dataWilayahPopuler: [],
    dataWilayah: [],
    dataDestinasi: [],
    dataVideos: [],
    dataBacaan: [],
    dataWisata: [],
    dataAkomodasi: [],
    dataTour: [],
    dataInfo: '',
    dataTentang: '',
  };
  
  const dataReducer = (state = initialState, action) => {
      switch (action.type) {
          case SET_BANNERS:{
              return {
                  ...state,
                  dataBanners: action.payload,
                }
          }
          case SET_WILAYAH_POPULER:{
              return {
                  ...state,
                  dataWilayahPopuler: action.payload,
                }
          }                    
          case SET_WILAYAH:{
            return {
                ...state,
                dataWilayah: action.payload,
              }
          }
          case SET_DESTINASI:{
            return {
                ...state,
                dataDestinasi: action.payload,
              }
          }
          case SET_VIDEOS:{
            return {
                ...state,
                dataVideos: action.payload,
              }
          }
          case SET_BACAAN:{
            return {
                ...state,
                dataBacaan: action.payload,
              }
          }
          case SET_WISATA:{
            return {
                ...state,
                dataWisata: action.payload,
              }
          }
          case SET_AKOMODASI:{
            return {
                ...state,
                dataAkomodasi: action.payload,
              }
          }
          case SET_TOUR:{
            return {
                ...state,
                dataTour: action.payload,
              }
          }
          case SET_INFO:{
            return {
                ...state,
                dataInfo: action.payload,
              }
          }
          case SET_TENTANG:{
            return {
                ...state,
                dataTentang: action.payload,
              }
          }
          default:{
              return state;
          }
      }
  };
  
  export default dataReducer;