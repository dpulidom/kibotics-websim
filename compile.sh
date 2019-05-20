#!/bin/sh

python3 -m http.server 8000 &
cd simcore
npm run dev &
firefox http://0.0.0.0:8000/Teleoperator/
