import { Row } from "@/types/database";
import { getParticipant } from "@/utils/getParticipant";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { GoBack } from "@/components/goBack/GoBack";

export default async function Contest({
  params,
}: {
  params: { slug: Row<"participant">["id"]; id: Row<"contest">["id"] };
}) {
  const participant = await getParticipant({ id: params.slug });
  return (
    <>
      <GoBack route={`/dashboard/contest/${params.id}`} title={"retour"} />
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{participant.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <Image
                src={participant.photo ?? "/images/placeholder.png"}
                alt="Image"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div>
              <p>{participant.participant}</p>
              <CardDescription>{participant.email}</CardDescription>
            </div>
            <p>Note</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
