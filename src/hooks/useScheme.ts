import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCookie, setCookie } from "cookies-next"
import { useEffect } from "react"
import { queryKey } from "src/constants/queryKey"

type Scheme = "light" | "dark"
type SetScheme = (scheme: Scheme) => void

const useScheme = (): [Scheme, SetScheme] => {
  const queryClient = useQueryClient()

  const scheme = "light"

  const setScheme = (scheme: "light" | "dark") => {
    setCookie("scheme", scheme)

    queryClient.setQueryData(queryKey.scheme(), scheme)
  }

  useEffect(() => {
    if (!window) return

    const scheme = getCookie("scheme")
    setScheme(scheme === "dark" ? "dark" : "light")
  }, [])

  return [scheme, setScheme]
}

export default useScheme
