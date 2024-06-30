import {createRoot} from 'react-dom/client';
import React from 'react';
import './index.scss';
import {App} from '@/components';

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
