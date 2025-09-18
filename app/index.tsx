import { useOnBoardingStore } from "@/store/onBoarding.store";
import { Redirect } from "expo-router";

export default function Index() {
  const { hasOnBoarded } = useOnBoardingStore();

  if (hasOnBoarded) {
    return <Redirect href="/(auth)/sign-up" />;
  } else {
    return <Redirect href="/onBoarding" />;
  }
}
