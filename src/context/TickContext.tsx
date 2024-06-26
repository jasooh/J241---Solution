// Tick context
// This context provides state and methods to manage the simulation of divsion of infected and its properties. 

// Hooks & types
import { useState, useRef, useContext, createContext, ReactNode, MutableRefObject } from "react";

interface TickProps {
    startSimulation: () => void, // Begins the dividing of infected cells
    pauseSimulation: () => void, // Pauses at the current tick, temporarily pausing all cell division
    restartSimulation: () => void, // Clears the simulation
    changeSimulationInterval: (value: number) => void, // Adjusts the time between cell divsions (state updates)
    interval: number, // Keeps track of current time between cell divisions
    tick: number, // Keeps track of how many ticks/generations of bacteria have passed
    isRunning: MutableRefObject<boolean> // Keeps track of if the simulation is running,
};

const Tick = createContext({} as TickProps)

// Provider component
const TickProvider = ({children}:{children: ReactNode}) => {
    // State variables
    const [tick, setTick] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [interval, setIntervalValue] = useState(1);
    const isRunning = useRef(false);

    // Context methods
    const startSimulation = () => { // Start tick counting
        if (!isRunning.current) {
            const currentId = setInterval(() => {
                setTick(prevTick => (prevTick + 1));
            }, interval*1000);
            setIntervalId(currentId);
            isRunning.current = true;
        };
    };

    const pauseSimulation = () => { // Pause counting
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            isRunning.current = false;
        };
    };

    const restartSimulation = () => { // Restart
        pauseSimulation();
        setTick(0);
        isRunning.current = false;
    };

    const changeSimulationInterval = (value: number) => { // Used to adjust intervals between generations
        if (isRunning.current) {
            pauseSimulation();
        };
        setIntervalValue(value);
    };

    return (
        <Tick.Provider value={{ startSimulation, pauseSimulation, restartSimulation, changeSimulationInterval, interval, tick, isRunning }}>{children}</Tick.Provider>
    );
};

// useTickContext hook
const useTickContext = () => {
    const TickContext = useContext(Tick);
    return TickContext;
};

export { TickProvider, useTickContext, type TickProps };