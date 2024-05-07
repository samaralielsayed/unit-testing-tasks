import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import React from "react";

import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";

import Comments from "./Comments";
const CommentMocked = [
  {
       id: 1,
        name: "repellat consequatur praesentium vel minus molestias voluptatum",
        email: "Dallas@ole.me",
        body: "maiores sed dolores similique labore et inventore et\nquasi "
  },
  {
    id: 2,
        name: "et fugit eligendi deleniti quidem qui sint nihil autem",
        email: "Presley.Mueller@myrl.com",
        body: "maiores sed dolores similique labore et inventore et\nquasi "
  }, {
    id: 3,
    name: "et omnis dolorem",
    email: "Mallory_Kunze@marie.org",
    body: "maiores sed dolores similique labore et inventore et\nquasi "
  }, {
    id: 4,
    name: "et omnis dolorem",
    email: "Mallory_Kunze@marie.org",
    body: "maiores sed dolores similique labore et inventore et\nquasi "
  }, {
    id: 5,
    name: "provident id voluptas",
    email: "Meghan_Littel@rene.us",
    body: "maiores sed dolores similique labore et inventore et\nquasi "
  },
];

const server = setupServer(
  http.get("*/comments", () => {
    return HttpResponse.json(CommentMocked);
  })
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<comments/>", () => {
  test("comments list after successful data fetching", async () => {
    render(<Comments />);

    CommentMocked.forEach((Comment) => {
      expect(
        screen.getByRole("heading", { level: 2, name: Comment.name })
      ).toBeInTheDocument();
      expect(screen.getByText(Comment.email)).toBeInTheDocument();
    });
  });

  test("something wrong when fetch comments fails", async () => {
    server.use(
      http.get("*/commentss", () => {
        return HttpResponse.json({}, { status: 400 });
      })
    );
    render(<Comments />);

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });

  test("empty message for empty comments response", async () => {
    server.use(
      http.get("*/comments", () => {
        return HttpResponse.json([]);
      })
    );
    render(<Comments />);

    expect(screen.getByText("No comments available")).toBeInTheDocument();
  });
});
