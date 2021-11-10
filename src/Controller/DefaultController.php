<?php

namespace App\Controller;




use App\Entity\Geolocation;
use DirectoryIterator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Notifier\Notification\Notification;
use Symfony\Component\Notifier\NotifierInterface;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class DefaultController extends AbstractController
{

    /**
     * @Route("/", name="home")
     * @template("Front/index.html.twig")
     */
    public function indexAction(Request $request)
    {
        $dataPro = file_get_contents("../public/json/provincia.json");//charge for provincia into the selecct
        $provincia = json_decode($dataPro, true);
        return [
            'provincia' => $provincia,
        ];
    }


    /**
     * @Route("/ajax/geo",  options={"expose"=true}, name="ajax.g")
     */
    public function geoAction(Request $request)
    {
        $data=$request->request;
        $geo= new Geolocation();
        $geo->setLatitude($data->get('lat'));
        $geo->setLongitude($data->get('lon'));
        $geo->setWind($data->get('wind'));
        $geo->setHumidity($data->get('humidity'));
        $this->getDoctrine()->getManager()->persist($geo);$this->getDoctrine()->getManager()->flush();

        return $this->json(['message'=>' Se acaba de guardar un registro nuevo']);
    }

}