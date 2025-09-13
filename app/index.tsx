import { useOnBoardingStore } from "@/store/onBoarding.store";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";

export default function Index() {
  const {hasOnBoarded} = useOnBoardingStore()

  // console.log("hasOnBoarded", hasOnBoarded);

  useEffect(() => {
    if (hasOnBoarded) {
      console.log("redirecting to tabs");
    }
  }, [hasOnBoarded]);
  


  return hasOnBoarded ? <Redirect href="/home" /> : <Redirect href="/onBoarding" />;
}
