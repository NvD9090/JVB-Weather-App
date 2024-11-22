import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/config";
import axios from "axios";
import { WeatherData } from "../../types";

interface WeatherState {
    data: WeatherData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null
}

const initialState: WeatherState = {
    data: null,
    status: 'idle',
    error: null
}

export const getWeather = createAsyncThunk(
    'weather/getWeather',
    async (location: string, { rejectWithValue }) => {
        try {
            const response = await axios.get<WeatherData>(api.apiUrl, {
                params: {
                    key: api.apiKey,
                    q: location,
                    days: api.defaultParams.days,
                    aqi: api.defaultParams.aqi,
                    alert: api.defaultParams.alerts,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Network Error');
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWeather.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeather.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload
            })
            .addCase(getWeather.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
    }
})

export default weatherSlice.reducer