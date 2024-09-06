#!/usr/bin/env bash

rm -rf dist/*
deno run -A npm:rollup -c rollup.config.js
sed -i '1s@^@import { Buffer } from "node:buffer"; import process from "node:process";@' dist/index.js
