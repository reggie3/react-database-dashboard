import * as fs from "fs";
import path from "path";

const DESTINATION_FOLDER = "src/pages/admin";

type ModelField = { name: string; type: string; notes: string };
type SchemaInfoObject = {
  modelName: string;
  modelContent: string[];
};

type ModelDataObject = {
  name: string;
  type: string;
  note?: string;
  typescriptType?: string;
};

type ModelInfo = Record<string, ModelField[]>;

const prismaToTypescriptType = (prismaType: string): string => {
  const typeMap: Record<string, string> = {
    String: "string",
    Int: "number",
    Boolean: "boolean",
    DateTime: "Date",
    BigInt: "bigint",
    Decimal: "number", // Adjust as needed for Decimal type
    // Add more mappings as needed
  };
  return typeMap[prismaType] || prismaType;
};

const getModelDataObjects = (schemaInfoObject: SchemaInfoObject) => {
  const result: ModelDataObject[] = [];

  for (const line of schemaInfoObject.modelContent) {
    const [name, type, note] = line.split(/\s+/);
    const typescriptType = prismaToTypescriptType(type);
    result.push({ name, type, note, typescriptType });
  }

  return {
    modelName: schemaInfoObject.modelName,
    typeInfo: result,
  };
};

const getSchemaModelInfo = (schemaContent: string): SchemaInfoObject[] => {
  // Extract model names
  const modelNames = schemaContent
    .match(/model (\w+)/g)!
    .map((match) => match.split(" ")[1]);

  const regex = new RegExp(
    `model\\s+(${modelNames.join("|")})\\s*{([^}]*)}`,
    "gs"
  );

  // @ts-expect-error - downlevelIteration
  const matches = [...schemaContent.matchAll(regex)];

  const models = matches.map((match) => {
    const modelName = match[1];
    const modelContent = match[2]
      .trim()
      .split("\n")
      .map((line: string) => line.trim());
    return { modelName, modelContent };
  });

  return models;
};

// Function to parse Prisma schema
async function parsePrismaSchema() {
  try {
    // Get Prisma schema content
    const schemaContent = fs.readFileSync("prisma/schema.prisma", "utf-8");

    const schemaInfoObjects = getSchemaModelInfo(schemaContent);
    const modelData = schemaInfoObjects.map((schemaInfoObject) => {
      return getModelDataObjects(schemaInfoObject);
    });

    // Write model information to a JSON file
    fs.writeFileSync(
      path.join(process.cwd(), DESTINATION_FOLDER, "prismaSchemaInfo.json"),
      JSON.stringify(modelData, null, 2)
    );

    console.log(
      "Model information successfully parsed and saved to modelInfo.json"
    );
  } catch (error) {
    console.log(error);
  }
}

// Execute the parsing function
parsePrismaSchema();
