import Link from "next/link";
import { Nabla } from "next/font/google";
import Container from "./Container";

const nabla = Nabla({ 
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
  })

export default function Header() {
    return (
        <header className="bg-primary shadow-lg">
            <Container className="py-5 flex">
                <p className={`${nabla.className} text-4xl  `}>
                    <Link href="/">
                        TODOLIST
                    </Link>
                </p>
            </Container>
        </header>
    )
}