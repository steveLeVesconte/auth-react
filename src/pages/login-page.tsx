import {
  Image,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Center,
  SimpleGrid,
  List,
  ListItem,
  CardHeader,
  Flex,
} from "@chakra-ui/react";
import LoginCard from "./login-card";
import goGameImage from "../assets/igo.jpg";

const Login = () => {
  return (
    <Grid marginTop={10} gap={10} className="landing-grid" marginLeft="auto">
      <GridItem className="landing-grid-intro" gridArea="intro">
        <Card h="100%">
          <CardHeader>
            <Heading>Welcome to React Go Game Kata</Heading>
          </CardHeader>
          <CardBody>
            <Flex flexDirection="column" height="100%">
              <p>
                One purpose of the project is to provide an adequately rich
                domain for the exploration of multiple technologies. In my
                experience, many learning projects are too simple to challenge a
                developer to deeply exercise a technology.{" "}
              </p>

              <Heading
                marginTop="20px"
                marginBottom="20px"
                size="md"
                paddingTop={0}
              >
                Technologies Employed:
              </Heading>

              <div className="tech-grid">
                <div>React</div>
                <div>Typescript</div>

                <div>
                  Firebase Realtime Database - cloud-hosted NoSQL database
                </div>

                <div>Chakra UI - component library</div>

                <div>React Context API & Zustand - state management</div>

                <div>React Hook Form</div>
                <div>Firebase Authentication Service from Google</div>

                <div>Vite - for project setup, building and packing</div>
              </div>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem gridArea="login" className="landing-grid-login">
        <LoginCard></LoginCard>
      </GridItem>
      <GridItem gridArea="go-pic">
        <Card h="100%" className="landing-grid-image">
          <CardBody>
            <Center>
              <Image src={goGameImage}></Image>
            </Center>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem className="landing-grid-special" gridArea="special">
        <Card h="100%">
          <CardHeader>
            <Heading>Special Secret Login Bypass</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid gap={3}>
              <p>
                Another purpose of this website is to allow interested persons
                to easily see my work. To facilitate this, I have provided two
                accounts with easy usernames and passwords so that you can view
                the site without "signing up". This allows you to quickly access
                games-in-progress without needing to recruit a friend to play
                against you. Though, if you want to, you definitely can play
                against each other using these two credentials. There is of
                course the possibility that I will be sending updates as you
                play, but this should not cause any issues as the CI/CD process
                is quite seamless.
              </p>

              <p>
                You are also welcome to sign up. A "real" email is not required
                as email verification has been turned off.
              </p>

              <List spacing={4}>
                <ListItem>
                  <p>
                    Test Account email A: <strong>roo2@roo2.com</strong>{" "}
                  </p>
                  <p>
                    Test Account password A: <strong>12345678</strong>
                  </p>
                </ListItem>
                <ListItem>
                  <p>
                    Test Account email B: <strong>roo3@roo3.com </strong>{" "}
                  </p>
                  <p>
                    {" "}
                    Test Account password B: <strong>12345678</strong>
                  </p>
                </ListItem>
              </List>
              <p>
                Please consider providing any feedback at this email address:
                twowaypress@gmail.com{" "}
              </p>
            </SimpleGrid>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default Login;
