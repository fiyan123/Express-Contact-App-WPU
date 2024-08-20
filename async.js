function samplePromise() {
    return Promise.resolve("ian");
}


async function run()
{
    const name = await samplePromise();
    console.info(name);
}

run();