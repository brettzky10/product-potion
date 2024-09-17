"use client"

import React, { useEffect, useState } from 'react'
import { TimerContainer } from './timer-container'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TimerProps {
  initialTime: {days: number, hours: number, minutes: number, seconds: number}
}

export function Timer({ initialTime }: TimerProps) {
  /* const [time, setTime] = useState<number>(initialTime);
  const [newTime, setNewTime] = useState<number>(0) */
  const [days, setDays] = useState<number>(initialTime.days);
  const [hours, setHours] = useState<number>(initialTime.hours);
  const [minutes, setMinutes] = useState<number>(initialTime.minutes);
  const [seconds, setSeconds] = useState<number>(initialTime.seconds);
  const [message, setMessage] = useState<string>("");
  

  // const timeToDays = time * 60 * 60 * 24 * 1000;
  // //console.log(timeToDays)
  
  useEffect(() => {
    //let countDownDate = new Date().getTime() + timeToDays;

    const updateTime = setInterval(() => {
      /*  const now = new Date().getTime();
      const difference = countDownDate - now; */

      const newDays = initialTime.days//Math.floor(difference / (1000 * 60 * 60 * 24));
      const newHours = initialTime.hours//Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const newMinutes = initialTime.minutes//Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const newSeconds = initialTime.seconds//Math.floor((difference % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
      

       /* if (difference <= 0) {
        clearInterval(updateTime);
        setMessage("The Discount Has Expired");
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }  */
    }, 1000);

    return () => {
      clearInterval(updateTime);
    }
  
  });

  // const handleClick = () => {
  //   setTime(newTime);
  //   setNewTime(0);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTime(Number(e.target.value));
  // };

  console.log(days)
  console.log(hours)
  console.log(minutes)

  return (
    <div className="flex flex-col items-center space-y-4">
      <TimerContainer days={days} hours={hours} minutes={minutes} seconds={seconds} />
      {message && <p className="text-primary">{message}</p>}
    </div>
  )
}