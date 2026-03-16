from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from openai import OpenAI


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ask_chatbot(request):
    """AI Chatbot endpoint"""
    try:
        message = request.data.get('message', '')
        
        if not message:
            return Response(
                {'detail': 'Message is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Initialize OpenAI client
        client = OpenAI()
        
        # System prompt for HVAC services context
        system_prompt = """You are a helpful assistant for an HVAC (Heating, Ventilation & Air Conditioning) 
        Services marketplace. Answer only questions about HVAC services, how to hire experts, pricing, 
        how to become a seller, or how to place orders on this platform. Decline anything outside this scope 
        with a polite message."""
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        reply = response.choices[0].message.content
        
        return Response({'reply': reply}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {'detail': f'Error: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

