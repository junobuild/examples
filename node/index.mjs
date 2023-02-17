#!/usr/bin/env node

import {getDoc} from "@junobuild/core";
import fetch from 'node-fetch';
import {AnonymousIdentity} from '@dfinity/agent';

const get = async () =>
    console.log("Get",
        await getDoc({
            collection: "demo",
            key: "my_id",
            satellite: {
                identity: new AnonymousIdentity(),
                satelliteId: "xo2hm-lqaaa-aaaal-ab3oa-cai",
                fetch,
            }
        })
    );

console.log("This is a demo client in NodeJS");

await get();