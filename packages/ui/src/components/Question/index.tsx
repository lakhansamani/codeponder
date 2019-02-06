import { distanceInWordsStrict } from "date-fns";
import * as React from "react";
import { Card, Flex, Text } from "rebass";
import styled from "../../theme/styled-components";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { MyButton } from "../MyButton";

interface Props {
  id: string;
  text: string;
  programmingLanguage?: string | null;
  codeSnippet?: string | null;
  createdAt: string;
  path?: string | null;
  creator: {
    id: string;
    username: string;
    pictureUrl: string;
    bio: string;
    accessToken?: string | null;
  };
}

interface QuestionProps extends Props {
  numReplies: number;
}

interface CommentCardProps extends Props {
  isOwner: boolean;
  newComment?: boolean;
  numReplies?: number;
  onOpenEditor: (e: any) => void;
}

interface BaseProps extends Props {
  isOwner?: boolean;
  newComment?: boolean;
  numReplies?: number;
  onOpenEditor?: (e: any) => void;
  variant: "outline" | "flat";
}

const CommentContainer = styled(Card as any)`
  background-color: #fff;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  margin: 0.9rem;

  & .comment-title {
    border-bottom: 1px solid #d1d5da;
    padding: 0.5em;
  }

  & .user-role {
    background-color: rgb(253, 243, 218);
    border: 1px solid rgb(233, 219, 205);
    border-radius: 3px;
    font-family: rubik;
    margin-left: 0.5em;
    padding: 2px 4px;
  }

  & .comment-text {
    margin: 0;
    padding: 0.7rem;
    white-space: normal;
  }

  & .btn-reply {
    border-color: rgba(27, 31, 35, 0.1);
    line-height: 1;
    margin-left: auto;
    margin-right: 5px;
    padding: 0.3em;
  }
`;

export const GrayText = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize={1} fontFamily="rubik" color="#A5A5A5" pl=".4rem" pr=".8rem">
    {children}
  </Text>
);

export const Question = ({ path, ...props }: QuestionProps) => {
  return (
    <Card p="1rem">
      <BaseCommentCard {...props} variant="flat" />
      {path && (
        <Flex alignItems="center">
          <Icon name="link" fill="#a5a5a5" />
          <GrayText>This code is a reference to: {path}</GrayText>
        </Flex>
      )}
    </Card>
  );
};

export const CommentCard = (props: CommentCardProps) => {
  return (
    <CommentContainer>
      <BaseCommentCard {...props} variant="outline" />
    </CommentContainer>
  );
};

const BaseCommentCard = ({
  text,
  path,
  numReplies,
  createdAt,
  creator: { username, pictureUrl },
  isOwner,
  onOpenEditor,
  variant,
}: BaseProps) => {
  const dtString = distanceInWordsStrict(new Date(), Date.parse(createdAt), {
    addSuffix: true,
  });

  return (
    <>
      <Flex className="comment-title" alignItems="center">
        <Flex alignItems="center">
          <Avatar m="0rem" size={28} src={pictureUrl} />
          <Flex flexDirection="column" justifyContent="center" ml=".6rem">
            <Flex alignItems="center">
              <Text mb=".2rem" fontFamily="rubik" fontSize={2} fontWeight="500">
                {username}
              </Text>
              {isOwner && (
                <Text mb="0.2rem" className="user-role" fontSize={1}>
                  Author
                </Text>
              )}
            </Flex>
            <Flex>
              {Number(numReplies) >= 0 && (
                <>
                  <Icon size={12} name="comment" fill="#A5A5A5" />
                  <GrayText>{numReplies}</GrayText>
                </>
              )}
              <Icon size={12} name="clock" fill="#A5A5A5" />
              <GrayText>{dtString}</GrayText>
            </Flex>
          </Flex>
        </Flex>
        {variant === "outline" && (
          <MyButton
            variant="form"
            className="btn-reply"
            onClick={onOpenEditor}
            title="Reply"
          >
            <Icon size={16} name="reply" fill="#555555" />
          </MyButton>
        )}
      </Flex>
      <Text
        className="comment-text"
        my="1rem"
        fontFamily="rubik"
        fontSize={2}
        color="#78909C"
      >
        {text}
      </Text>
    </>
  );
};
