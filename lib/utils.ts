/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
import { clsx, type ClassValue } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";

import { aspectRatioOptions } from "@/constants";

/**
 * The function `cn` in TypeScript merges multiple class values using `clsx` and `twMerge`.
 * @param {ClassValue[]} inputs - The `inputs` parameter in the `cn` function is a rest parameter that
 * allows you to pass any number of class values as arguments. These class values can be strings,
 * arrays of strings, or objects with key-value pairs where the key represents the class name and the
 * value represents a condition to include
 * @returns The `cn` function is returning the result of merging the class names passed as arguments
 * using the `clsx` function and then merging them with Tailwind CSS classes using the `twMerge`
 * function.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * The `handleError` function in TypeScript checks the type of the error parameter and logs and throws
 * an error based on its type.
 * @param {unknown} error - The `handleError` function takes an `error` parameter of type `unknown`,
 * which means it can be any type of value. The function then checks the type of the `error` parameter
 * and handles it accordingly:
 */
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// PLACEHOLDER LOADER - while image is transforming
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

/**
 * The function `toBase64` converts a string to its Base64 representation, using different methods
 * depending on whether it is running in a Node.js environment or a browser environment.
 * @param {string} str - The `str` parameter is a string that represents the input data that needs to
 * be encoded to Base64 format.
 */
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/* The `export const dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(1000, 1000))}`;` statement
is creating a data URL that represents an SVG image encoded in Base64 format. Here's a breakdown of
what's happening: */
export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

/**
 * The `formUrlQuery` function takes in search parameters, a key, and a value, and returns a URL with
 * the updated query parameters.
 * @param {FormUrlQueryParams}  - The `formUrlQuery` function takes in an object with the following
 * properties as its parameter:
 * @returns The `formUrlQuery` function is returning a URL string with updated query parameters based
 * on the provided `key` and `value`. The function parses the existing search parameters from the URL,
 * updates the value associated with the provided key, and then returns the updated URL string with the
 * modified query parameters.
 */
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

/**
 * The function removes specified keys from the query parameters of a URL and returns the updated URL.
 * @param {RemoveUrlQueryParams}  - The `removeKeysFromQuery` function takes in an object with two
 * properties:
 * @returns The function `removeKeysFromQuery` returns a new URL string with specified query parameters
 * removed.
 */
export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  // Remove null or undefined values
  Object.keys(currentUrl).forEach(
    (key) => currentUrl[key] == null && delete currentUrl[key]
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

/**
 * The `debounce` function in TypeScript helps to limit the frequency of function calls by delaying
 * execution until a certain amount of time has passed without additional calls.
 * @param func - The `func` parameter is a function that you want to debounce. It can take any number
 * of arguments and does not return any value.
 * @param {number} delay - The `delay` parameter specifies the time in milliseconds for which the
 * execution of the `func` function will be delayed after the last invocation.
 * @returns A debounced version of the original function is being returned.
 */
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export type AspectRatioKey = keyof typeof aspectRatioOptions;

/**
 * The function `getImageSize` returns the width or height of an image based on the type and dimension
 * specified.
 * @param {string} type - The `type` parameter is a string that determines how the image size should be
 * calculated. If the type is "fill", the function will use aspect ratio options to determine the size.
 * Otherwise, it will simply return the width or height of the image.
 * @param {any} image - The `image` parameter in the `getImageSize` function is expected to be an
 * object containing information about an image. It is of type `any`, which means it can be of any data
 * type.
 * @param {"width" | "height"} dimension - The `dimension` parameter in the `getImageSize` function
 * specifies whether to retrieve the width or height of the image. It can have two possible values:
 * "width" or "height".
 * @returns The function `getImageSize` returns the width or height of an image based on the specified
 * type and dimension. If the type is "fill", it will return the width or height based on the aspect
 * ratio of the image. Otherwise, it will return the width or height directly from the image object. If
 * the value is not found, it will default to 1000.
 */
export const getImageSize = (
  type: string,
  image: any,
  dimension: "width" | "height"
): number => {
  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;
};

/**
 * The `download` function in TypeScript downloads a file from a given URL and saves it with a
 * specified filename.
 * @param {string} url - The `url` parameter in the `download` function is a string that represents the
 * URL of the resource you want to download.
 * @param {string} filename - The `filename` parameter is a string that represents the name of the file
 * that will be downloaded.
 */
export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
  }

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;

      if (filename && filename.length)
        a.download = `${filename.replace(" ", "_")}.png`;
      document.body.appendChild(a);
      a.click();
    })
    .catch((error) => console.log({ error }));
};

/**
 * The function `deepMergeObjects` recursively merges two objects deeply in TypeScript.
 * @param {any} obj1 - `obj1` is the first object that will be merged with `obj2` in the
 * `deepMergeObjects` function.
 * @param {any} obj2 - The `obj2` parameter in the `deepMergeObjects` function represents the object
 * that will be merged into `obj1`. If `obj2` is `null` or `undefined`, the function will return `obj1`
 * as it is. Otherwise, it will recursively merge the properties of
 * @returns The `deepMergeObjects` function returns a new object that is a deep merge of the two input
 * objects `obj1` and `obj2`.
 */
export const deepMergeObjects = (obj1: any, obj2: any) => {
  if (obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};
