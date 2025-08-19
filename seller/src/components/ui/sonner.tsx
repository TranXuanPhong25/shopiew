"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        //make the class important! to override the default styles
        classNames: {
          success: "!bg-green-50   !text-green-700 !border-green-200",
          warning: "!bg-yellow-50 !text-yellow-800 !border-yellow-200",
          loading: "!bg-gray-50 !text-gray-800 !border-gray-200",
          error: "!bg-red-50 !text-red-700 !border-red-200",
          info: "!bg-blue-50 !text-blue-700 !border-blue-200",
        }
      }}
      closeButton={true}
      
      icons={{

      }}
      {...props}
    />
  )
}

export { Toaster }
