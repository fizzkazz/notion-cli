#!/usr/bin/env node
import { Command, InvalidArgumentError } from "commander";
import { createPage } from "./notion/createPage";

// Root
const program = new Command();
program
  .name("notion-cli")
  .description("CLI tool for Notion API")
  .version("0.0.1");

// Create Page(s)
const page = program.command("page");
page
  .command("create")
  .option(
    "-s, --sequential <numbers...>",
    'The start number and the end number of sequential pages (Sequential page titles limited to 99 like: "01_title" to "40_title"). If only one number given, it will be used as the end number. Otherwise, the first argument will be used as the start number and the second will be used as the end number.'
  )
  .requiredOption("-p, --parent <page_id>", "ID of the parent page")
  .requiredOption("-t, --title <title>", "Title for the new page")
  .action((options) => {
    if (options.sequential) {
      const start =
        options.sequential &&
        options.sequential.length > 1 &&
        validateIntForSequenceNumber(
          options.sequential[0],
          "--sequence",
          "start"
        );
      const end =
        options.sequential && start
          ? validateIntForSequenceNumber(
              options.sequential[1],
              "--sequential",
              "end"
            )
          : validateIntForSequenceNumber(
              options.sequential[0],
              "--sequential",
              "end"
            );
      if (start && start >= end) {
        throw new InvalidArgumentError(
          'The argument "start" must be less than "end".'
        );
      }
      const titleSequence = Array.from(
        {
          length: start ? end - start + 1 : end + 1,
        },
        (_, i) =>
          `${("00" + (start ? i + start : i)).slice(-2)}_${options.title}`
      );

      titleSequence.forEach((v) =>
        createPage(options.parent, v).then((v) => console.log(v))
      );
    } else {
      createPage(options.parent, options.title).then((v) => console.log(v));
    }
  });

function validateIntForSequenceNumber(
  value: string,
  optionName: string,
  argName: string
) {
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue) || parsedValue > 99 || parsedValue < 0) {
    throw new InvalidArgumentError(
      `A given argument for ${argName} of ${optionName} must be a number between 0 and 99, but got: ${value}.`
    );
  }
  return parsedValue;
}

program.parse();
