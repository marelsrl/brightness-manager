import { useState, useEffect } from 'react'
const { ipcRenderer } = window.electron

function App() {
  let [luminosita, setLuminosita] = useState(0)

  useEffect(() => {
    ipcRenderer.invoke('init').then((res) => {
      setLuminosita(res.toString().replace('[', '').replace(']', ''))
      // console.log(res);
    })
  }, [])

  const manageChange = (valore) => {
    setLuminosita((prev) => (prev = valore))
    const res = ipcRenderer.invoke('change', valore)
    console.log(res)
  }

  return (
    <main>
      <section onClick={() => ipcRenderer.send('close')}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </section>
      <p>luminosità {luminosita}</p>
      <input
        type="range"
        onChange={(e) => manageChange(e.target.value)}
        value={luminosita}
        min={0}
        max={100}
      />

    </main>
  )
}

export default App
