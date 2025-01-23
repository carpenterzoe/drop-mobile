import { useEffect } from "react"

/**
 * 组件卸载时运行
 * @param fn 
 */
const useUnmount = (fn: () => void) => {
  useEffect(() => {
    // 有return 表示组件卸载时执行
    return fn?.()
  }, [])
}

export default useUnmount;