import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClickContext } from '+/util/contexts.ts'
import { ClickRecord } from '+/interfaces/ClickRecord.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClickContext value={new ClickRecord()}>
      <App />
    </ClickContext>
  </StrictMode>,
)
