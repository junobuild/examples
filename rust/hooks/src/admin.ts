import {satelliteVersion} from "@junobuild/admin";
import {unsafeIdentity} from "@junobuild/core";

export const version = async () => {
    const v = await satelliteVersion({
        satellite: {
            satelliteId: import.meta.env.VITE_SATELLITE_ID,
            identity: await unsafeIdentity(),
            container: import.meta.env.VITE_CONTAINER,
        },
    });
    console.log('Version:', v);
}