import { useOnlineStatus } from '@/utils/hooks/useOnlineStatus';
import './onlineStatus.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const OnlineStatus = () => {
    const isOnline = useOnlineStatus();

    const onlineStatusContRef = useRef(null);

    useEffect(() => {
      if (!onlineStatusContRef.current) return;

      gsap.set(onlineStatusContRef.current, {
        left: '-100%',
      });
    }, [])
    

    useEffect(() => {
      if (!onlineStatusContRef.current) return;

      const onlineStatusCont = onlineStatusContRef.current;

      if (!isOnline) {
        console.log('offline')
        gsap.to(onlineStatusCont, {
          left: 0,
          duration: 0.8,
          ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
        });
      } else {
        setTimeout(() => {
          gsap.to(onlineStatusCont, {
            left: "-100%",
            duration: 0.8,
            ease: CustomEase.create("custom", "M0,0 C0.709,0 1,0.307 1,1"),
          });
        }, 2000);
      }

    }, [isOnline]);
    

  return (
    <div ref={onlineStatusContRef} className={`onlineStatus_wrapper ${isOnline ? 'isOnline' : 'isOffline'}`}>
        {isOnline ? "You're Online" : "You're Offline"}
    </div>
  )
}

export default OnlineStatus