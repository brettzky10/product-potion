import { Cpu, Hammer, HeartPulse, Home, Joystick, PawPrint, RefreshCcw, ShoppingBag, Sofa, TentTree } from "lucide-react"

export type CategoryListProps = {
  id: string
  label: string
  icon: JSX.Element
  path: string
}

export const CATEGORY_LIST: CategoryListProps[] = [
  {
    id: "0",
    label: "All",
    icon: <RefreshCcw />,
    path: "",
  },
  {
    id: "1",
    label: "Home",
    icon: <Home />,
    path: "home",
  },
  {
    id: "2",
    label: "Electronics",
    icon: <Cpu />,
    path: "electronics",
  },
  {
    id: "3",
    label: "Furniture",
    icon: <Sofa />,
    path: "furniture",
  },
  {
    id: "4",
    label: "Outdoor",
    icon: <TentTree />,
    path: "outdoor",
  },
  {
    id: "5",
    label: "Pets",
    icon: <PawPrint />,
    path: "pets",
  },
  {
    id: "6",
    label: "Home Improvement",
    icon: <Hammer />,
    path: "home-improvement",
  },
  {
    id: "7",
    label: "Health",
    icon: <HeartPulse />,
    path: "health",
  },
]