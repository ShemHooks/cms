<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'recorded_at',
    ];

   
    public function child()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
