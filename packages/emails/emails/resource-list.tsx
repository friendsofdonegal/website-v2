import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ResourceListEmailProps {
  includeMailingListCallout?: boolean;
}

export const ResourceListEmail = ({
  includeMailingListCallout = false,
}: ResourceListEmailProps = {}) => {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for your interest in the Donegal Community Resource List. You'll find a PDF
        attached.
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mb-6">
              <Img
                src="https://friendsofdonegal.org/FOD-logo.619d67d1.png"
                width="150"
                height="150"
                alt="Friends of Donegal"
                className="mx-auto my-0"
              />
            </Section>
            <Text>
              Thank you for your interest in Donegal Community and Beyond Resource List meticulously
              compiled for the benefit of the Friends of Donegal and Getting Ahead Graduates.
            </Text>
            <Text>
              The attached PDF resource list encompasses a variety of essential services including:
            </Text>
            <ul className="list-decimal">
              <li>
                <b>Shelter and Housing Services</b>
                <br />
                Information on affordable housing options and emergency shelters.
              </li>
              <li>
                <b>Food and Nutrition</b>
                <br />
                Locations and contact for food banks and community meal programs.
              </li>
              <li>
                <b>Health and Wellness</b>
                <br />
                Available medical, dental, and mental health services.
              </li>
              <li>
                <b>Substance Abuse and Recovery</b>
                <br />
                Contact information for support groups and treatment programs.
              </li>
              <li>
                <b>Educational and Employment Services</b>
                <br />
                Learning opportunities, including GED programs and employment assistance.
              </li>
              <li>
                <b>Transportation Services</b>
                <br />
                Available transportation assistance.
              </li>
              <li>
                <b>Financial Assistance</b>
                <br />
                Guidance on accessing temporary financial support.
              </li>
            </ul>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResourceListEmail;
