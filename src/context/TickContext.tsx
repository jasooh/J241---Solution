import { useState, useRef, useContext, createContext, ReactNode, SetStateAction, Dispatch, MutableRefObject } from "react";

interface TickProps {
    startSimulation: () => void,
    pauseSimulation: () => void,
    restartSimulation: () => void,
    changeSimulationInterval: (value: number) => void,
    interval: number,
    tick: number,
    isRunning: MutableRefObject<Boolean>
}

const Tick = createContext({} as TickProps)

const TickProvider = ({children}:{children: ReactNode}) => {
    const [tick, setTick] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [interval, setIntervalValue] = useState(1);
    const isRunning = useRef(false);

    const startSimulation = () => {
        if (!isRunning.current) {
            const currentId = setInterval(() => {
                setTick(prevTick => (prevTick+1));
            }, interval*1000)
            setIntervalId(currentId);
            isRunning.current = true;
        }
    }

    const pauseSimulation = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            isRunning.current = false;
        }
    }

    const restartSimulation = () => {
        pauseSimulation();
        setTick(0);
        isRunning.current = false;
    }

    const changeSimulationInterval = (value: number) => {
        if (isRunning.current) {
            restartSimulation();
            startSimulation();
        }
        setIntervalValue(value);
    }

    return (
        <Tick.Provider value={{ startSimulation, pauseSimulation, restartSimulation, changeSimulationInterval, interval, tick, isRunning }}>{ children }</Tick.Provider>
    )
}

const useTickContext = () => {
    const TickContext = useContext(Tick);
    return TickContext
}

export { TickProvider, useTickContext }