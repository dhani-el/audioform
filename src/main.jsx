import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import StoryBoard from './storyboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoryBoard/>
  </StrictMode>,
)
