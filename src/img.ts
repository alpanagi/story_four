export async function load_image(filename: string): Promise<ImageBitmap> {
    const data = await fetch(`assets/textures/${filename}`);
    const blob = await data.blob();
    return await createImageBitmap(blob, { colorSpaceConversion: "none" });
}
