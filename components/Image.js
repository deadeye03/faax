"use client";
import React from "react";
import { IKImage } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Image(props) {
  return (
    <>   
      <IKImage urlEndpoint={urlEndpoint} {...props} />
    </>
  );
}