"use server"

import csv from 'csv-parser';
import stream from 'stream';
import {prismaClient} from "@/services/prisma-client";

async function importData(prevState: any, formData: FormData) {
  try {
    console.log("called"); // Debugging log

    const file = formData.get('file') as File;

    if (!file) {
      throw new Error('File is required');
    }

    const results: any[] = [];

    // 1. Read File Data (using await for async operations)
    const buffer = await file.arrayBuffer();

    // 2. Parse CSV (simplified using the csv-parse package)
    // @ts-ignore
    const parser = csv({delimiter: ','}); // Assuming comma-separated values
    const records = await new Promise<any[]>((resolve, reject) => {
      parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
          results.push(record);
        }
      });
      parser.on('error', reject);
      parser.on('end', resolve);
      parser.write(Buffer.from(buffer));
      parser.end();
    });

    for (const res of results) {
      // check if email already exist
      const customer = await prismaClient.customer.findFirst({
        where: {
          email: res.email,
        },
      });

      if (customer)
        continue;
      await prismaClient.customer.create({
        data: {
          name: res.name,
          email: res.email,
          phone: res.phone || "",
          address: res.address || "",
        },
      });

    }

    return {
      code: 200,
      message: `Successfully imported ${results.length} records`,
      data: results,
    };

  } catch (error) {
    console.error("Error importing data:", error); // Log errors
    throw error; // Re-throw the error for the calling function to handle
  }
}

export {importData};