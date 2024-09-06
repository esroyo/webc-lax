#!/usr/bin/env bash

rm -rf dist/*
npx rollup -c rollup.config.js
sed -i '1s@^@import { Buffer } from "node:buffer"; import process from "node:process";@' dist/index.js
