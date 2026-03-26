import { SignUp } from "@clerk/react"

const SignupPage = () => {
  return (
    <section className="bg-[url(/Homepagebg.png)] bg-cover h-dvh">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>
      <div className="w-fit mx-auto relative top-15 md:top-45">
        <SignUp />
      </div>
    </section>
  )
}

export default SignupPage